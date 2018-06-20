import Icon from "../Icon";

// Pie chart svg, kudos to David Gilbertson's HN article: (https://hackernoon.com/a-simple-pie-chart-in-svg-dbdd653b6936)
const colors = ["#f44336", "#4caf50", "#795548", "#ff9800", "#2196f3"];

const getCoordinatesForPercent = percent => [
  Math.cos(2 * Math.PI * percent),
  Math.sin(2 * Math.PI * percent)
];

const Pie = ({ categories }) => {
  if (!categories) return;

  let cumulativePercent = 0;
  const nbCategories = categories.length;
  const slices = categories.map(category => ({
    percent: 1 / nbCategories,
    color: colors[Number(category) - 1]
  }));

  const pathEls = [];
  slices.forEach(slice => {
    // destructuring assignment sets the two variables at once
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

    // each slice starts where the last slice ended, so keep a cumulative percent
    cumulativePercent += slice.percent;

    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

    // if the slice is more than 50%, take the large arc (the long way around)
    const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

    pathEls.push(
      <path
        d={`M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`}
        fill={slice.color}
      />
    );
  });

  return (
    <div class="pie">
      {pathEls.length ? (
        <svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg)">
          {pathEls}
        </svg>
      ) : (
        <Icon name="question" />
      )}
    </div>
  );
};

export default Pie;
