import CategoryItem from './CategoryItem';
import {useAppSelector} from '../../../app/hooks';
import {selectCategory} from '../../../store/categorySlice';

const CategoryList = () => {
  const category = useAppSelector(selectCategory);
  return (
    <>
      {category.map(item=>{
        return <CategoryItem key={item.id} category={item}/>
      })}
    </>
  );
};

export default CategoryList;