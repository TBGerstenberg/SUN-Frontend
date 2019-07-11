import postTypeEnum from "./enumerations/postTypeEnum";
import Person from "./person";

/**
 * Class representing a post as defined by the domain model.
 */
class Post {
  constructor(postValues) {
    this.id = postValues.id || null;
    // one of the values from postTypeEnum.js
    this.type = postValues.type || null;
    this.title = postValues.title || null;
    this.summary = postValues.summary || null;
    this.content = postValues.content || null;
    this.page = postValues.page || null;
    this.author = new Person(postValues.author) || null;
    this.createdAt = postValues.createdAt || null;
    this.updatedAt = postValues.updatedAt || null;
  }

  /**
   * Converts a number value of a postType, which is represented by an @see PostTypeEnum
   * to its respective string value in the enum.
   */
  static typeAsString(typeAsNumber) {
    let valuesInEnum = Object.values(postTypeEnum);
    for (let index = 0; index < valuesInEnum.length; index++) {
      if (valuesInEnum[index] === typeAsNumber) {
        return index;
      } else {
        return -1;
      }
    }
  }

  /**
   * Converts a string value of a postType, which is represented by an @see PostTypeEnum
   * to its respective index in the enum.
   */
  static typeAsNumber(typeAsString) {
    return postTypeEnum[typeAsString];
  }

  /**
   * Generates a relative URL to the chairpage of the chair
   * @param {Number} pageId -the ID of the page that this post was published at.
   */
  static getAuthorPageLink(pageId) {
    return "/chair/" + pageId;
  }
}

export default Post;
