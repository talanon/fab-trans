if(location.hostname === "felttable.com"){
  const stylesheet = document.styleSheets[0];
  const observer = new MutationObserver(() => imgFeltTableUpdater());
  observer.observe(document.body, { childList: true, subtree: true });

  function imgFeltTableUpdater() {
    const cardImgs = document.querySelectorAll('.fabCardUpper');
    cardImgs.forEach((cardImg) => {
      let cardImgClass = cardImg.classList[2];
      let cardImgValue = cardImgClass.split('_')[1];
      stylesheet.insertRule("."+cardImgClass+" { background-image: url(https://d2wlb52bya4y8z.cloudfront.net/media/cards/large/FR_"+cardImgValue+".webp) !important;}")
    });
  }
}else if(location.hostname === "talishar.net"){

  const observer = new MutationObserver(() => imgTalisharUpdater());
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('DOMContentLoaded', imgTalisharUpdater);
  function imgTalisharUpdater() {
    let imgs = document.querySelectorAll('img');

    imgs.forEach((img) => {
      if(img.src.includes('cardimages') && !['https://talishar.net/cardimages/Difficulties.webp', 'https://talishar.net/cardimages/CardBack.webp'].includes(img.src) && !img.dataset.oldName) {
        let cardImgValue = img.src.split('https://talishar.net/cardimages/')[1];
        img.dataset.oldName = "https://talishar.net/cardimages/"+cardImgValue;
        img.src = 'https://d2wlb52bya4y8z.cloudfront.net/media/cards/large/FR_'+cardImgValue;
        img.addEventListener('load', () => {console.log('load')});
        img.addEventListener('error', () => {
          img.src = img.dataset.oldName;
        });
      }
    });

    let newImgs = document.querySelectorAll('img');
    newImgs.forEach((img) => {
      if(img.src.includes('Difficulties')) {
        console.log(img);
        img.src = img.dataset.oldName;
      }
    });
  }

  setInterval(() => {
    let images = document.querySelectorAll('img[src*="Difficulties"]');
    images.forEach(image => {
      image.src = image.dataset.oldName;
    });
  },500);

}
