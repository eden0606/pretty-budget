import { CATEGORY_SVGS } from '@/lib/constants';
import styles from './SpendByCategory.module.scss';
import { formatNumber } from '@/lib/helpers';

interface CategoryButtonProps {
  data: Record<string, any>;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ data }) => {
  return (
    <div className={styles.category}>
      {CATEGORY_SVGS[data.category] && CATEGORY_SVGS[data.category]}
      <p>${formatNumber(data.total)}</p>
      <p>
        {data.category
          .replace('activities/travel', 'activities')
          .replace('health/wellness', 'wellness')}
      </p>
    </div>
  );
};

export default CategoryButton;
