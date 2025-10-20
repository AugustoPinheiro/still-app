import { ClosetClothingListsType, ClosetClothingType } from "@/types/ClosetClothingType";

const clothingItemMock: ClosetClothingType = {
  id: 1,
  title: 'Vintage Denim Jacket',
  image: 'https://example.com/image1.jpg',
  category_id: 4,
  link: 'https://example.com/vintage-denim-jacket',
  is_monetized: true,
  price: 79.99,
  owned_by_id: 102,
  attributes: [12, 14, 19], 
  private: false
};
const clothingItemMockTwo: ClosetClothingType = {
  id: 2,
  title: 'Vintage Denim Jacket',
  image: 'https://example.com/image1.jpg',
  category_id: 6,
  link: 'https://example.com/vintage-denim-jacket',
  is_monetized: true,
  price: 79.99,
  owned_by_id: 102,
  attributes: [12, 14, 19], 
  private: false
};
const clothingItemMockThree: ClosetClothingType = {
  id: 3,
  title: 'Vintage Denim Jacket',
  image: 'https://example.com/image1.jpg',
  category_id: 5,
  link: 'https://example.com/vintage-denim-jacket',
  is_monetized: true,
  price: 79.99,
  owned_by_id: 102,
  attributes: [12, 14, 19], 
  private: false
};

const clothingListMock: ClosetClothingListsType = {
  meta: {
    cursor: 0,
    total: 10,
    private: false
  },
  result: [
    clothingItemMock,
    {
      id: 6,
      title: 'Vintage Denim Jacket',
      image: 'https://example.com/image1.jpg',
      category_id: 4,
      link: 'https://example.com/vintage-denim-jacket',
      is_monetized: true,
      price: 79.99,
      owned_by_id: 102,
      attributes: [12, 14, 19], 
      private: false
    },
    {
      id: 4,
      title: 'Vintage Denim Jacket',
      image: 'https://example.com/image1.jpg',
      category_id: 4,
      link: 'https://example.com/vintage-denim-jacket',
      is_monetized: true,
      price: 79.99,
      owned_by_id: 102,
      attributes: [12, 14, 19], 
      private: false
    },{
      id: 5,
      title: 'Vintage Denim Jacket',
      image: 'https://example.com/image1.jpg',
      category_id: 4,
      link: 'https://example.com/vintage-denim-jacket',
      is_monetized: true,
      price: 79.99,
      owned_by_id: 102,
      attributes: [12, 14, 19], 
      private: false
    },
    clothingItemMockTwo,
    clothingItemMockThree
  ]
};

export default clothingListMock;