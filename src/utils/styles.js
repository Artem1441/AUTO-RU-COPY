export const STYLES = {
  RED: "#db3727",
  HEADER_HEIGHT: window.innerWidth > 520 ? 60 : 45,
  NAVBAR_HEIGHT: window.innerWidth > 600 ? 50 : 35,
  ICON_SIZE: 24,
  ICON_SIZE_SMALL: 12,
  GREEN: "#5b0",
  MARK_SIZE: window.innerWidth > 600 ? 36 : 32,
  AUTO_PICTURE_SIZE:
    window.innerWidth > 780
      ? 120
      : window.innerWidth > 500
      ? 80
      : window.innerWidth > 400
      ? 70
      : 60,
  BORDER_DEFAULT_STYLE: "1px solid #ccc",
  SINGLE_AUTO_WIDTH:
    window.innerWidth > 780
      ? 200
      : window.innerWidth > 600
      ? 150
      : window.innerWidth > 500
      ? 120
      : 100,
  SINGLE_AUTO_HEIGHT:
    window.innerWidth > 780
      ? 150
      : window.innerWidth > 600
      ? 112.5
      : window.innerWidth > 500
      ? 90
      : 75,
  TYPE_OF_BODY_WIDTH:
    window.innerWidth > 800
      ? 180
      : window.innerWidth > 600
      ? 160
      : window.innerWidth > 450
      ? 135
      : 120,
  DEFAULT_LIMIT: 10,
  DEDUCTIBLE_ID: 1000000000, // не менять
  SINGLE_AUTO_MAIN_FONT_SIZE_TEXT:
    window.innerWidth > 800
      ? 28
      : window.innerWidth > 600
      ? 24
      : window.innerWidth > 400
      ? 20
      : 18,
  AVATAR_SIZE: window.innerWidth > 800 ? 50 : window.innerWidth > 500 ? 40 : 30,
  MESSAGE_SINGLE_CHAT_FONT_SIZE: 12,
  QUERY_MESSAGES: 18,
  LOGO_SIZE: window.innerWidth > 780 ? 55 : window.innerWidth > 520 ? 40 : 36,
  TRANSITION_TITLE_SIZE: window.innerWidth > 600 ? 24 : 16,
  ADD_AUTO_MARKS_HEIGHT:
    window.innerWidth > 600
      ? window.innerHeight - 200
      : window.innerHeight - 160,
  WINDOW_WIDTH: () => {
    return window.innerWidth;
  },
  WINDOW_HEIGHT: () => {
    return window.innerHeight;
  },
  FREE_SPACE_HEIGHT: () => {
    return window.innerHeight - STYLES.NAVBAR_HEIGHT - STYLES.HEADER_HEIGHT;
  },
};
