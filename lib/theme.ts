/**
 * Script chạy trong <head> TRƯỚC khi trang được vẽ:
 * - thêm class `js` (CSS chỉ ẩn/animate nội dung khi có JS, nên tắt JS vẫn thấy đủ nội dung)
 * - đặt `data-theme` từ lựa chọn đã lưu (localStorage "lb-theme"), mặc định theo prefers-color-scheme.
 * Giữ ngắn, không phụ thuộc gì.
 */
export const THEME_STORAGE_KEY = 'lb-theme';

export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.dataset.theme=t;}catch(e){}})();`;
