import './_components.js';
import vars from './_vars.js';
import {isTouch} from './functions/check-touch.js';

const {IS_TOUCH_CLASS, bodyEl} = vars;

if (isTouch()) {
  bodyEl.classList.add(IS_TOUCH_CLASS);
}
