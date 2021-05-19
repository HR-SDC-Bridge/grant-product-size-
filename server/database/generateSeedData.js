const generateSeedData = (id) => {
  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const sizeSets = [
    [
      ['Length', 'inch'],
      ['Width', 'inch'],
    ],
    [
      ['Length', 'inch'],
      ['Width', 'inch'],
      ['Thread count', 'inches squared'],
      ['Filling weight', 'ounce'],
      ['Total weight', 'ounce']
    ],
    [
      ['Max. load', 'pound'],
      ['Height', 'inch']
    ]
  ];

  let document = {};
  const hasBonus = random(0, 2);
  const sizeType = random(-1, 2);
  const sizingGroup = sizeSets[sizeType];
  const numSizes = sizeType < 0 ? 0 : sizingGroup.length;
  for (let j = 0; j < numSizes; j++) {
    let temp = {
      productSizesId: id,
      name: sizingGroup[j][0],
      unit: sizingGroup[j][1],
      size: random(5, 150)
    };
    if (!document.sizes) {
      document.sizes = [];
    }
    document.sizes.push(temp);
  }
  // Bonus sizing if exists
  if (hasBonus && document.sizes) {
    const sizeType = random(0, 2);
    const sizingGroup = sizeSets[2][sizeType];
    let temp = {
      productSizesId: id,
      name: sizingGroup[0],
      unit: sizingGroup[1],
      size: random(35, 250)
    };
    document.sizes.push(temp);
  }
  // Generate title
  if (sizeType === 0) {
    let length = document.sizes[0].size;
    let width = document.sizes[1].size;
    document.title = `${length} x ${width}`;
  } else if (sizeType === 1) {
    let sizes = ['Twin', 'Single', 'Queen', 'King'];
    let title = random(0, 4);
    document.title = `${sizes[title]}`;
  } else {
    document.title = '';
  }

  document.id = id;

  return document;
};

module.exports = generateSeedData;