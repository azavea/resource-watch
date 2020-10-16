import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import InView from 'components/in-view';
import AreaCard from '../card';

// styles
import './styles.scss';

const AreaCardList = ({
  areas,
  className,
  isColumn,
  onMapView,
  onEditArea,
  onDeletionArea,
}) => {
  const componentClass = classnames({
    'c-areas-list': true,
    [className]: !!className,
  });

  return (
    <div className={componentClass}>
      <div className={classnames({ row: !isColumn })}>
        {areas.map((area) => (
          <div
            key={area.id}
            className={classnames({ 'column small-12 medium-4': !isColumn })}
          >
            <InView
              triggerOnce
              threshold={0.25}
            >
              {({ ref, inView }) => (
                <div
                  ref={ref}
                  className="card-container"
                  style={{
                    height: isColumn ? 325 : 390,
                  }}
                >
                  {inView && (
                    <AreaCard
                      area={area}
                      onMapView={onMapView}
                      onDeletionArea={onDeletionArea}
                      onEditArea={onEditArea}
                    />
                  )}
                </div>
              )}
            </InView>
          </div>
        ))}
      </div>
    </div>
  );
};

AreaCardList.defaultProps = {
  className: null,
  isColumn: false,
  onEditArea: null,
};

AreaCardList.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  className: PropTypes.string,
  isColumn: PropTypes.bool,
  onMapView: PropTypes.func.isRequired,
  onEditArea: PropTypes.func,
  onDeletionArea: PropTypes.func.isRequired,
};

export default AreaCardList;
