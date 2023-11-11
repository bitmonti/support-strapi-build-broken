module.exports = {
  beforeCreate(event) {
    const { data } = event.params;

    if (!data.date) {
      data.date = data.createdAt.toISOString().slice(0, 10);
    }
  },
};
