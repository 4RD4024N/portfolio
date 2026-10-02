// Sayfa çizilmeden önce çalışan betik: kayıtlı seçimi, yoksa sistem ayarını uygular (titreme olmasın)
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;
