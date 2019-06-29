import Person from "./person";
import postTypeEnum from "./enumerations/postTypeEnum";

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

  static typeAsNumber(typeAsString) {
    return postTypeEnum[typeAsString];
  }

  static getAuthorPageLink(pageId) {
    return "/chair/" + pageId;
  }
}

export default Post;
