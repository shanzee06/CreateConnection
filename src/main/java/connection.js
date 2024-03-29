async function moreConnectionsPlease() {
  // maximum limit of Connect buttons clicked
  const LIMIT = 100;
  // wait in ms before each scroll
  const SCROLL_TIMEOUT = 600;
  // bulk scroll will scroll this amount of times
  const BULK_SCROLL_COUNT = 15;
  // wait in ms before each click
  const CLICK_DELAY = 300;
  // if this amount of connections in the page, time to click
  const MINIMUM_CONNECTS_TO_CLICK = 60;
  // if this amount of connections in the page, time to scroll
  const MINIMUM_CONNECTS_TO_SCROLL = 10;

  var connects = 0;
  var fails = 0;

  // retrieves array "Connect" buttons
  function selectButtonElements() {
    return [...document.querySelectorAll("button span")].filter(a =>
      a.textContent.includes("Connect")
    );
  }

  // scrolls to the bottom of the page
  async function singleScroll() {
    return new Promise(resolve => {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
        console.log("scroll!");
        resolve();
      }, SCROLL_TIMEOUT);
    });
  }

  // delays an html element click
  async function singleClick(elem) {
    return new Promise(resolve => {
      setTimeout(() => {
        elem.click();
        resolve();
      }, CLICK_DELAY);
    });
  }

  // scroll to the bottom of the page several times
  async function bulkScroll() {
    for (let i = 0; i < BULK_SCROLL_COUNT; i++) {
      await singleScroll();
    }
  }

  // click on all but a few Connect buttons
  async function bulkClick() {
    let elements = selectButtonElements();
    console.log("elements length:", elements.length);
    for (let i = 0; i < elements.length - MINIMUM_CONNECTS_TO_SCROLL; i++) {
      try {
        await singleClick(elements[i]);
        console.log("click!");
        connects++;
      } catch (err) {
        fails++;
      }
    }
  }

  // the list of people to connect to must keep a minimum amount of people
  function isManyConnects(amount) {
    return selectButtonElements().length >= amount;
  }

  do {
    if (isManyConnects(MINIMUM_CONNECTS_TO_CLICK)) {
      console.log("There are plenty of connections, time to click...");
      await bulkClick();
    } else {
      console.log("Out of connections, need to scroll...");
      await bulkScroll();
    }
    console.log(`New Connections:${connects} Failed clicks:${fails}`);
  } while (connects < LIMIT);
}

moreConnectionsPlease();