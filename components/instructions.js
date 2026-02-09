import React, { useState } from 'react';

const Instructions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`game-instructions ${isOpen ? 'open' : ''}`}>
      <div className="instructions-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="icon">📖</span>
        <span className="text">Hướng dẫn chơi</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
      </div>
      {isOpen && (
        <div className="instructions-content">
          <div className="instruction-item goal">
            <div className="item-icon">🏆</div>
            <div className="item-text">
              <strong>Mục tiêu</strong> Đạt 15 điểm phát triển (PV) đầu tiên để chiến thắng.
            </div>
          </div>
          <div className="instruction-item tokens">
            <div className="item-icon">💎</div>
            <div className="item-text">
              <strong>Lấy Token</strong> Lấy 3 token khác màu HOẶC 2 token cùng màu (nếu &gt; 4).
            </div>
          </div>
          <div className="instruction-item buy">
            <div className="item-icon">💰</div>
            <div className="item-text">
              <strong>Mua Thẻ</strong> Dùng token mua thẻ. Thẻ giảm chi phí cho các lượt sau.
            </div>
          </div>
          <div className="instruction-item reserve">
            <div className="item-icon">🔖</div>
            <div className="item-text">
              <strong>Đặt Chỗ</strong> Lấy 1 thẻ và 1 token vàng. Tối đa giữ 3 thẻ trên tay.
            </div>
          </div>
          <div className="instruction-item nobles">
            <div className="item-icon">👑</div>
            <div className="item-text">
              <strong>Quý Tộc</strong> Tự động nhận khi bạn có đủ số lượng thẻ yêu cầu.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
