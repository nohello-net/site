const slugify = require('slugify');

module.exports = () => {
  const fruits = [
    {
      name: 'Apple',
      plural: 'Apples',
      color: 'Green',
      count: 3,
      variety: 'Granny Smith',
    },
    {
      name: 'Banana',
      plural: 'Bananas',
      color: 'Yellow',
      count: 1,
      variety: 'Cavendish',
    },
  ];

  return fruits.map((fruit) => {
    fruit.slug = slugify(fruit.name, { replacement: '-', lower: true });
    fruit.path = `/${fruit.slug}/`;

    return fruit;
  });
};
