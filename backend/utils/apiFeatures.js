class ApiFeature {
  constructor(query, querystr) {
    (this.query = query), (this.querystr = querystr);
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    //filter by category
    const queryCopy = { ...this.querystr };
    const remove = ["page", "limit", "keyword"]; // other queries should be removed
    remove.forEach((e) => delete queryCopy[e]);

    //filter by Price & Rating

    let str = JSON.stringify(queryCopy);
    str = str.replace(/\b(gt|gte|lt|lte)\b/g, (e) => `$${e}`);

    this.query = this.query.find(JSON.parse(str));

    return this;
  }

  pagination(skips){
      const currPage = Number(this.querystr.page) || 1
      const skip = skips*(currPage - 1)

      this.query = this.query.limit(skips).skip(skip)
      return this
  }
}

module.exports = ApiFeature;
