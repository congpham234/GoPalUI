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
        <b>{title}</b>
        <p>{content1}</p>
        {isMenuEnabled && <p>{content2}</p>}
      </div>
      </div>
      {isMenuEnabled && <FiMoreHorizontal/>}
      
    </div>
  );
};

export default Item;
