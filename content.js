const IMG_FR_LIBRARY = 'https://d2wlb52bya4y8z.cloudfront.net/media/cards/large/FR_';

if (location.hostname === 'felttable.com') {
  const stylesheet = document.styleSheets[0];
  const observer = new MutationObserver(() => imgFeltTableUpdater());
  observer.observe(document.body, { childList: true, subtree: true });

// check here https://stackoverflow.com/a/52702882/14366026

  function imgFeltTableUpdater () {
    const cardImgs = document.querySelectorAll('[class*=\'cardImages\']');
    cardImgs.forEach((cardImg) => {
      if(!cardImg.dataset.fabTranslated){
        cardImg.classList.forEach((classC) => {
          cardImg.dataset.fabTranslated = 'true';
          let cardImgValue = classC.split('_')[1];
          resolveCors(IMG_FR_LIBRARY+cardImgValue + '.webp', 'feltTable', {stylesheet, classC, cardImgValue});
        });
      }
    });
  }
}
else if (location.hostname === 'talishar.net') {

  const observer = new MutationObserver(() => imgTalisharUpdater());
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('DOMContentLoaded', imgTalisharUpdater);

  function imgTalisharUpdater () {
    let imgs = document.querySelectorAll('img');

    imgs.forEach((img) => {
      if (img.src.includes('cardimages') && ![
          'https://talishar.net/cardimages/Difficulties.webp',
          'https://talishar.net/cardimages/CardBack.webp'].includes(img.src) &&
        !img.dataset.oldName) {
        let cardImgValue = img.src.split('https://talishar.net/cardimages/')[1];
        img.dataset.oldName = 'https://talishar.net/cardimages/' + cardImgValue;
        img.src = 'https://d2wlb52bya4y8z.cloudfront.net/media/cards/large/FR_' + cardImgValue;
        img.addEventListener('load', () => {console.log('load');});
        img.addEventListener('error', () => {
          img.src = img.dataset.oldName;
        });
      }
    });

    let newImgs = document.querySelectorAll('img');
    newImgs.forEach((img) => {
      if (img.src.includes('Difficulties')) {
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
  }, 500);

}

function resolveCors (url, domain, options) {
  const xmlRequest = new XMLHttpRequest();
  xmlRequest.open('GET', url, true);
  xmlRequest.onreadystatechange = () => {
    if (xmlRequest.readyState !== 4) {
      return;
    }
    if (xmlRequest.status === 200) {
      imgUpdater(domain, options);
    }
    else {
      const tmpImg = document.createElement('img');
      tmpImg.onerror = (...args) => {console.log(url, 'error', args);};
      tmpImg.onload = () => {
        imgUpdater(domain, options);
      };
      tmpImg.src = url;
    }
  };
  xmlRequest.send();
}

function imgUpdater(domain, options) {
  switch (domain) {
    case 'feltTable':
      feltTableImgUpdate(options);
      break;
    case 'talishar':
      break;
  }
}

function feltTableImgUpdate({stylesheet, classC, cardImgValue}) {
  stylesheet.insertRule('.' + classC +
    ' { background-image: url(' + IMG_FR_LIBRARY +
    cardImgValue + '.webp) !important;}');
}
