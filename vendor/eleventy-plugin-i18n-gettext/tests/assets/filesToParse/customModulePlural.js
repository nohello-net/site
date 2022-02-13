module.exports = () => {
  return i18n._n(
    locale,
    'This fruit is excellent. (javascript)',
    'These fruits are excellent. (javascript)',
    fruit.count
  );
};
