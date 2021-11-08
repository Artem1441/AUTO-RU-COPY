export const STYLES = {
  RED: "#db3727",
  HEADER_HEIGHT: 60,
  NAVBAR_HEIGHT: 50,
  ICON_SIZE: 24,
  ICON_SIZE_SMALL: 12,
  GREEN: "#5b0",
  MARK_SIZE: 36,
  AUTO_PICTURE_SIZE: 120,
  BORDER_DEFAULT_STYLE: "1px solid #ccc",
  SINGLE_AUTO_WIDTH: 200,
  SINGLE_AUTO_HEIGHT: 150,
  TYPE_OF_BODY_WIDTH: 180,
  DEFAULT_LIMIT: 4,
  DEDUCTIBLE_ID: 1000000000,
  SINGLE_AUTO_MAIN_FON_SIZE_TEXT: 28,
  AVATAR_SIZE: 50,
  MESSAGE_SINGLE_CHAT_FONT_SIZE: 12,
  QUERY_MESSAGES: 18,
  FREE_SPACE_HEIGHT: () => {
    return window.innerHeight - STYLES.NAVBAR_HEIGHT - STYLES.HEADER_HEIGHT;
  },
};