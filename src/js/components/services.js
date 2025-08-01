import 'swiped-events';
import {throttle} from '../functions/throttle.js';
import vars from '../_vars.js';

(() => {
  const {services, servicesList, servicesItems} = vars;
  const totalItems = servicesItems.length;
  const servicesListStyle = getComputedStyle(servicesList);
  const listLeftOffset = parseInt(servicesListStyle.marginLeft) || 0;
  const listRightOffset = parseInt(servicesListStyle.marginRight) || 0;
  const listOffset = listLeftOffset + listRightOffset;
  const gap = parseInt(servicesListStyle.gap) || 0;
  const itemWidth = servicesItems[0].offsetWidth;
  const step = itemWidth + gap;

  let servicesWidth = 0;
  let maxIndex = 0;
  let currentIndex = 0;

  function handleResize() {
    servicesWidth = services.offsetWidth;
    maxIndex = totalItems - Math.ceil(servicesWidth / step) + 1;
  }

  function updateTransform() {
    let offset = currentIndex * step;
    if (currentIndex === maxIndex) {
      offset =
        offset +
        (Math.floor(servicesWidth / step) * step - servicesWidth) +
        listOffset;
    }
    servicesList.style.transform = `translateX(-${offset}px)`;
  }

  services.addEventListener('swiped-left', () => {
    if (currentIndex + 1 <= maxIndex) {
      currentIndex++;
    }
    updateTransform();
  });

  services.addEventListener('swiped-right', () => {
    if (currentIndex > 0) {
      currentIndex--;
    }
    updateTransform();
  });

  const throttledHandleResize = throttle(handleResize);
  window.addEventListener('resize', throttledHandleResize);

  handleResize();
})();
