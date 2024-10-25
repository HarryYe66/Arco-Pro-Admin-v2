import React from 'react';
import { Menu } from '@arco-design/web-react';

const ContextMenuWrapper = ({
  visible,
  position,
  onMouseLeave,
  menuData,
  onMenuClick,
}) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        borderRadius: '8px', // 添加圆角
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 添加阴影
        zIndex: 1000,
      }}
      onMouseLeave={onMouseLeave}
    >
      <Menu onClickMenuItem={onMenuClick}>
        {menuData.map((item: any, itemIndex: number) =>
          item.children ? (
            <Menu.SubMenu
              key={`menu-${item.key}-${itemIndex}`}
              title={item.text}
            >
              {item.children.map((subItem: any, subItemIndex: number) => (
                <Menu.Item key={`${subItem.key}`}>{subItem.text}</Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={`${item.key}`}>{item.text}</Menu.Item>
          )
        )}
      </Menu>
    </div>
  );
};

export default ContextMenuWrapper;
