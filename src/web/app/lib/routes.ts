
export const appRoutes = {
  index: '/',
  theme: '/theme',
  addPage: '/add-page',
  get editPageRoot() {
    return `${this.editPage()}/:id`;
  },
  editPage(id?: string) {
    return `/edit-page${id ? '/' + id : ''}`;
  },
  notebooks: '/notebooks'
};