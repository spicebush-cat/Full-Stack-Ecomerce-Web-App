class AppURL {
  static BaseURL = 'http://localhost:8000/api';

  static ProductListByRemark(remark) {
    return `${this.BaseURL}/productlistbyremark/${remark}`;
  }

  static ProductListByCategory(category) {
    return `${this.BaseURL}/productlistbycategory/${category}`;
  }

  static ProductListBySubCategory(category, subcategory) {
    return `${this.BaseURL}/productlistbysubcategory/${category}/${subcategory}`;
  }
}

export default AppURL;

