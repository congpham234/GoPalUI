import React from 'react';
import './Item.scss';
import { FiMoreHorizontal } from "react-icons/fi";

interface ItemProps  {
  title: string;
  image: string;
  content1: string;
  content2: string;
  isMenuEnabled: boolean;
}

const Item: React.FC<ItemProps> = ({ title, image, content1, content2, isMenuEnabled }) => {
  return (
    <div className="item">
      <div className="item-info">
      <div className="item-image">
        {image && <img src={image} alt={title} />}
      </div>
      <div className="item-content">
        <div className="body-bold"><p>{title}</p></div>
        <div><p>{content1}</p></div>
        {isMenuEnabled && <div><p>{content2}</p></div>}
      </div>
      </div>
      {isMenuEnabled && <FiMoreHorizontal/>}
      
    </div>
  );
};

export default Item;
