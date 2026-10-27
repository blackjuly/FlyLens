(function () {
  "use strict";
  var config = window.FLYLENS_SITE || {};
  var repository = String(config.repository || "").replace(/\/+$/, "");
  var asset = config.apkAsset || "flylens.apk";
  var downloadUrl = repository ? repository + "/releases/latest/download/" + encodeURIComponent(asset) : "";
  function byId(id) { return document.getElementById(id); }
  function configureDownloadLink(el) {
    if (!el) return;
    if (downloadUrl) { el.href = downloadUrl; el.setAttribute("rel", "noopener"); el.removeAttribute("aria-disabled"); return; }
    el.href = "#download"; el.setAttribute("aria-disabled", "true");
    el.addEventListener("click", function (event) { event.preventDefault(); showToast("发布地址还没配置，稍后再来看看"); });
  }
  ["downloadButton", "downloadButtonBottom", "navDownload", "footerDownload"].forEach(function (id) { configureDownloadLink(byId(id)); });
  var countTargets = document.querySelectorAll("[data-download-count]");
  var repoMatch = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)$/i.exec(repository);
  if (countTargets.length && repoMatch && typeof fetch === "function") {
    var releasesUrl = "https://api.github.com/repos/" + encodeURIComponent(repoMatch[1]) + "/" + encodeURIComponent(repoMatch[2]) + "/releases?per_page=100&page=";
    function countReleases(page, total, found) {
      return fetch(releasesUrl + page, { headers: { Accept: "application/vnd.github+json" } }).then(function (response) {
        if (!response.ok) throw new Error("Release count unavailable");
        return response.json();
      }).then(function (releases) {
        if (!Array.isArray(releases)) throw new Error("Invalid release data");
        releases.forEach(function (release) {
          if (release.draft || !Array.isArray(release.assets)) return;
          release.assets.forEach(function (file) {
            if (file.name !== asset) return;
            if (!Number.isSafeInteger(file.download_count) || file.download_count < 0) throw new Error("Invalid download count");
            total += file.download_count;
            found = true;
          });
        });
        return releases.length === 100 ? countReleases(page + 1, total, found) : { total: total, found: found };
      });
    }
    countReleases(1, 0, false).then(function (result) {
      if (!result.found) return;
      countTargets.forEach(function (element) {
        element.textContent = "累计下载 " + result.total.toLocaleString("zh-CN") + " 次";
        element.hidden = false;
      });
    }).catch(function () { /* Downloading remains available if GitHub's API is unavailable. */ });
  }
  var qr = byId("downloadQr"); var qrStatus = byId("qrStatus");
  if (qr && downloadUrl) {
    qr.src = config.qrImage || ("https://quickchart.io/qr?size=360&margin=2&ecLevel=Q&text=" + encodeURIComponent(downloadUrl));
    qr.alt = "扫码下载飞镜 APK"; if (qrStatus) qrStatus.textContent = "扫码直达 GitHub Release";
    qr.addEventListener("error", function () { qr.src = "assets/qr-placeholder.svg"; if (qrStatus) qrStatus.textContent = "二维码暂不可用，请点击下载"; }, { once: true });
  }
  var copy = byId("copyLink");
  if (copy) copy.addEventListener("click", function () {
    if (!downloadUrl) { showToast("发布地址还没配置"); return; }
    copyText(downloadUrl).then(function () { showToast("下载链接已复制"); }).catch(function () { window.prompt("复制这个下载地址", downloadUrl); });
  });
  document.querySelectorAll("[data-mode]").forEach(function (button) {
    button.addEventListener("click", function () {
      var cameraMode = button.getAttribute("data-mode") === "camera";
      document.querySelectorAll("[data-mode]").forEach(function (item) { var active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
      var canvas = byId("cameraCanvas"); if (canvas) canvas.classList.toggle("is-camera", cameraMode);
      setText("stageStatus", cameraMode ? "原厂相机录像中" : "OBS 输出中");
      setText("stageTitle", cameraMode ? "台词悬浮在镜头旁" : "观众只看到干净画面");
      setText("cameraMeta", cameraMode ? "00:18 · 4K" : "1080p · 30fps");
      var output = byId("outputLabel"); if (output) output.innerHTML = cameraMode ? "<span></span>共享麦克风已开启" : "<span></span>送入 OBS：干净摄像画面";
    });
  });
  function setText(id, value) { var el = byId(id); if (el) el.textContent = value; }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) { var area = document.createElement("textarea"); area.value = text; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select(); try { document.execCommand("copy") ? resolve() : reject(); } catch (error) { reject(error); } document.body.removeChild(area); });
  }
  var toastTimer;
  function showToast(message) { var toast = byId("toast"); if (!toast) return; toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200); }
}());
