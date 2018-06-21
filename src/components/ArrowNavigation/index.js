import Icon from "../Icon";

const ArrowNavigation = ({ onLeft, onRight }) => (
  <section class="hide-on-mobile">
    <div class="left-right">
      <div class="left" onClick={onLeft}>
        <Icon name="arrow" />
      </div>
      <div class="right" onClick={onRight}>
        <Icon name="arrow" />
      </div>
    </div>
  </section>
);

export default ArrowNavigation;
