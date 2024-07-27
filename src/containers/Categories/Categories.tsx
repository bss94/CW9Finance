import CategoryList from '../../components/Categories/CategoryList/CategoryList';
import AppModal from '../../components/AppModal/AppModal';

const Categories = () => {
  return (
    <div>
      categories
      <CategoryList/>
      <AppModal
        show={true}
        title={'asdasd'}
        onClose={()=>{}}
        onComplete={()=>{}}
        completeBtnName={'submit'}
      >
        asdasdd
      </AppModal>
    </div>
  );
};

export default Categories;