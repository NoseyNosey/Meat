document.addEventListener("DOMContentLoaded", function () {

  // ==========================
  // header
  // ==========================
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.header-menu');
  const navLinks = document.querySelectorAll('.header-list a');

  if (!header || !menuBtn) return;

  // メニューボタン押下（トグル）
  menuBtn.addEventListener('click', function () {
    header.classList.toggle('is-active');
  });

  // ナビリンク押下（必ず閉じる）
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('is-active');
    });
  });



  // ==========================
  // faqアニメーション
  // ==========================
  const items = document.querySelectorAll(".faq-list > li");

  items.forEach(function (item) {
    const hidden = item.querySelector(".faq-hidden");

    // 初期状態
    hidden.style.display = "none";
    hidden.style.height = "0px";
    hidden.style.opacity = "0";
    hidden.style.overflow = "hidden";

    item.addEventListener("click", function () {
      const isActive = item.classList.contains("is-active");

      // === 他の li をすべて閉じる ===
      items.forEach(function (i) {
        if (i === item) return;

        i.classList.remove("is-active");
        const h = i.querySelector(".faq-hidden");
        if (!h || h.style.display === "none") return;

        h.style.transition = "height 0.3s ease, opacity 0.3s ease";
        h.style.height = h.scrollHeight + "px";

        requestAnimationFrame(function () {
          h.style.height = "0px";
          h.style.opacity = "0";
        });

        setTimeout(function () {
          h.style.display = "none";
        }, 300);
      });

      // === すでに開いている場合は閉じる ===
      if (isActive) {
        hidden.style.transition = "height 0.3s ease, opacity 0.3s ease";
        hidden.style.height = hidden.scrollHeight + "px";

        requestAnimationFrame(function () {
          hidden.style.height = "0px";
          hidden.style.opacity = "0";
        });

        setTimeout(function () {
          hidden.style.display = "none";
        }, 300);

        item.classList.remove("is-active");
        return;
      }

      // === 開く ===
      item.classList.add("is-active");
      hidden.style.display = "block";
      hidden.style.height = "0px";
      hidden.style.opacity = "0";

      const height = hidden.scrollHeight + "px";

      requestAnimationFrame(function () {
        hidden.style.transition = "height 0.3s ease, opacity 0.3s ease";
        hidden.style.height = height;
        hidden.style.opacity = "1";
      });
    });
  });

  // ==========================
  // フェードイン・フェードアウト関数
  // ==========================

  /**
   * 指定した要素をフェードインする
   * @param {HTMLElement} element - フェードインする要素
   * @param {number} duration - アニメーション時間（ミリ秒）
   */
  function fadeIn(element, duration = 300) {
    element.style.opacity = 0;
    element.style.display = "block";
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      element.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  /**
   * 指定した要素をフェードアウトする
   * @param {HTMLElement} element - フェードアウトする要素
   * @param {number} duration - アニメーション時間（ミリ秒）
   */
  function fadeOut(element, duration = 400) {
    element.style.opacity = 1;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      element.style.opacity = 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        element.style.display = "none";
      }
    }

    requestAnimationFrame(animation);
  }
});
