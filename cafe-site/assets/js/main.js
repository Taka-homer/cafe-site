'use strict';

/* ============================================================
   共通パーツ（header / drawer / footer）の読み込み
   - data-include 属性に書いたHTMLファイルの中身を要素に差し込む
   - WordPress化する際は、この仕組みを get_template_part() に置き換え可能
============================================================ */
async function includeParts() {
  const slots = document.querySelectorAll('[data-include]');

  // すべてのパーツを並行して読み込み、完了を待つ
  await Promise.all(
    Array.from(slots).map(async (slot) => {
      const url = slot.dataset.include;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('ステータス: ' + response.status);
        }
        slot.innerHTML = await response.text();
      } catch (error) {
        console.error('パーツの読み込みに失敗しました → ' + url, error);
      }
    })
  );
}

/* ============================================================
   ドロワーメニュー（タブレット・スマホ用）の開閉
============================================================ */
function initDrawer() {
  const burger = document.querySelector('.js-burger');
  const drawer = document.querySelector('.js-drawer');
  const overlay = document.querySelector('.js-drawer-overlay');

  // 必要な要素がなければ何もしない
  if (!burger || !drawer) return;

  // メニューを開く
  const openDrawer = () => {
    drawer.classList.add('is-open');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-drawer-open'); // 背面のスクロールを止める
  };

  // メニューを閉じる
  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-drawer-open');
  };

  // ハンバーガーボタン：開いていれば閉じる／閉じていれば開く
  burger.addEventListener('click', () => {
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // 暗幕クリックで閉じる
  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  // メニュー内のリンクを押したら閉じる
  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ============================================================
   スクロール量に応じてヘッダーの見た目を切り替える
   - 少しスクロールしたら is-scrolled クラスを付与（背景色を表示）
============================================================ */
function initHeaderScroll() {
  const header = document.querySelector('.js-header');
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
  };

  updateHeader(); // 読み込み時にも一度判定
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/* ============================================================
   初期化
   - パーツの読み込み完了を待ってから、各機能を初期化する
============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  await includeParts();
  initDrawer();
  initHeaderScroll();
});
