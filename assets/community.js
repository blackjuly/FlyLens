(function () {
  "use strict";
  var list = document.getElementById("commentList");
  if (!list) return;
  var config = window.FLYLENS_SITE || {};
  var repository = String(config.repository || "").replace(/\/+$/, "");
  var match = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)$/i.exec(repository);
  var issue = config.commentsIssue;
  var status = document.getElementById("commentStatus");
  var refresh = document.getElementById("refreshComments");
  var more = document.getElementById("moreComments");
  if (!match || !Number.isSafeInteger(issue) || issue < 1) {
    status.textContent = "网页留言暂未配置，请前往 GitHub 查看与反馈。";
    return;
  }
  var thread = repository + "/issues/" + issue;
  document.getElementById("writeComment").href = thread + "#new_comment_field";
  document.getElementById("allComments").href = thread;
  if (typeof fetch !== "function") {
    status.textContent = "当前浏览器无法读取留言，请前往 GitHub 查看与反馈。";
    return;
  }
  var endpoint = "https://api.github.com/repos/" + encodeURIComponent(match[1]) + "/" + encodeURIComponent(match[2]) + "/issues/" + issue + "/comments?per_page=20&page=";
  var nextPage = 1;
  var busy = false;
  var hasMore = false;
  refresh.hidden = false;
  refresh.addEventListener("click", function () { loadComments(true); });
  more.addEventListener("click", function () { loadComments(false); });

  function renderComment(comment) {
    var article = document.createElement("article");
    article.className = "visitor-comment";
    var header = document.createElement("div");
    header.className = "visitor-comment-meta";
    var author = document.createElement("strong");
    author.textContent = comment.user && comment.user.login || "已注销用户";
    header.appendChild(author);
    var date = new Date(comment.created_at);
    if (!isNaN(date.getTime())) {
      var time = document.createElement("time");
      time.dateTime = date.toISOString();
      time.textContent = date.toLocaleDateString("zh-CN");
      header.appendChild(time);
    }
    var reply = document.createElement("a");
    reply.href = thread + "#issuecomment-" + comment.id;
    reply.target = "_blank";
    reply.rel = "noopener noreferrer";
    reply.textContent = "查看 / 回复 ↗";
    header.appendChild(reply);
    var body = document.createElement("p");
    // Keep public user content as text; never insert API-provided HTML.
    body.textContent = typeof comment.body_text === "string" ? comment.body_text : String(comment.body || "");
    article.appendChild(header);
    article.appendChild(body);
    return article;
  }

  function loadComments(reset) {
    if (busy) return;
    busy = true;
    refresh.disabled = more.disabled = true;
    list.setAttribute("aria-busy", "true");
    status.textContent = "正在读取留言…";
    var page = reset ? 1 : nextPage;
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, 12000);
    fetch(endpoint + page, { headers: { Accept: "application/vnd.github.text+json" }, signal: controller ? controller.signal : undefined })
      .then(function (response) {
        if (!response.ok) throw new Error("Comments unavailable");
        return response.json();
      }).then(function (comments) {
        if (!Array.isArray(comments) || comments.some(function (comment) { return !comment || !Number.isSafeInteger(comment.id) || comment.id < 1; })) throw new Error("Invalid comments");
        var fragment = document.createDocumentFragment();
        comments.forEach(function (comment) { fragment.appendChild(renderComment(comment)); });
        if (reset) list.textContent = "";
        list.appendChild(fragment);
        nextPage = page + 1;
        hasMore = comments.length === 20;
        status.textContent = list.children.length ? "已显示 " + list.children.length + " 条留言" : "还没有留言，欢迎分享你的第一次使用体验。";
      }).catch(function () {
        status.textContent = "暂时无法读取留言。可以重试，或前往 GitHub 查看与发表。";
      }).finally(function () {
        clearTimeout(timer);
        busy = false;
        refresh.disabled = more.disabled = false;
        more.hidden = !hasMore;
        list.setAttribute("aria-busy", "false");
      });
  }

  // Request comments only when the visitor reaches this section.
  if (typeof IntersectionObserver === "function") {
    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        observer.disconnect();
        loadComments(true);
      }
    }, { rootMargin: "200px" });
    observer.observe(list.parentElement);
  } else loadComments(true);
}());
