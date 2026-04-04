import { Button } from 'antd';
import { useState } from 'react';
import { 
  LoadingOutlined, 
  CheckCircleOutlined, 
  HeartOutlined, 
  HeartFilled,
  ArrowRightOutlined,
  SearchOutlined
} from '@ant-design/icons';

export const PrimaryButton = ({ 
  children, 
  loading = false, 
  icon, 
  size = 'large', 
  className = '', 
  success = false,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      type="primary"
      size={size}
      loading={loading}
      icon={loading ? <LoadingOutlined /> : success ? <CheckCircleOutlined /> : icon}
      className={`
        primary-button-enhanced
        ${isHovered ? 'button-hover' : ''}
        ${success ? 'button-success' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className="button-content">
        {children}
        {!loading && !success && <ArrowRightOutlined className="button-arrow" />}
      </span>
      <style jsx>{`
        .primary-button-enhanced {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6366f1, #818cf8);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          height: 52px;
          padding: 0 28px;
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .primary-button-enhanced.button-hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.45);
        }
        
        .primary-button-enhanced.button-success {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }
        
        .button-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        
        .primary-button-enhanced.button-hover .button-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        
        .primary-button-enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .primary-button-enhanced.button-hover::before {
          left: 100%;
        }
      `}</style>
    </Button>
  );
};

export const SecondaryButton = ({ 
  children, 
  icon, 
  size = 'large', 
  className = '', 
  outlined = false,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      size={size}
      icon={icon}
      className={`
        secondary-button-enhanced
        ${isHovered ? 'button-hover' : ''}
        ${outlined ? 'button-outlined' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
      <style jsx>{`
        .secondary-button-enhanced {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          height: 52px;
          padding: 0 24px;
          transition: all 0.3s ease;
        }
        
        .secondary-button-enhanced.button-outlined {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.9);
        }
        
        .secondary-button-enhanced.button-hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }
        
        .secondary-button-enhanced.button-outlined.button-hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </Button>
  );
};

export const WishlistButton = ({ 
  isWishlisted = false, 
  onToggle, 
  size = 'default',
  className = '',
  ...props 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <Button
      type="text"
      shape={size === 'small' ? 'circle' : 'default'}
      icon={isWishlisted ? <HeartFilled /> : <HeartOutlined />}
      onClick={handleClick}
      className={`
        wishlist-button
        ${isWishlisted ? 'wishlisted' : ''}
        ${isAnimating ? 'animating' : ''}
        ${className}
      `}
      {...props}
    >
      <style jsx>{`
        .wishlist-button {
          transition: all 0.3s ease;
          border-radius: 8px;
        }
        
        .wishlist-button.wishlisted {
          color: #ff4d4f;
          background: rgba(255, 77, 79, 0.1);
        }
        
        .wishlist-button.animating {
          animation: heartbeat 0.6s ease-in-out;
        }
        
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(1); }
          75% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Button>
  );
};

export const SearchButton = ({ 
  onSearch, 
  loading = false, 
  placeholder = 'Search...',
  className = '',
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value.trim()) {
      onSearch(value);
    }
  };

  return (
    <div className={`search-button-container ${isExpanded ? 'expanded' : ''} ${className}`} {...props}>
      <Button
        type="text"
        icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
        onClick={() => !loading && setIsExpanded(!isExpanded)}
        className="search-trigger"
        disabled={loading}
      />
      
      {isExpanded && (
        <div className="search-dropdown">
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchValue)}
            className="search-input"
            autoFocus
          />
          <div className="search-suggestions">
            <div className="suggestion-label">Popular searches:</div>
            <div className="suggestion-list">
              <span onClick={() => handleSearch('Standard Room')}>Standard Room</span>
              <span onClick={() => handleSearch('Deluxe Suite')}>Deluxe Suite</span>
              <span onClick={() => handleSearch('Pool Access')}>Pool Access</span>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .search-button-container {
          position: relative;
        }
        
        .search-trigger {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .search-button-container.expanded .search-trigger {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
        }
        
        .search-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.1);
          min-width: 320px;
          z-index: 1000;
          overflow: hidden;
          animation: slideDown 0.3s ease;
        }
        
        .search-input {
          width: 100%;
          padding: 16px;
          border: none;
          outline: none;
          font-size: 15px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .search-suggestions {
          padding: 16px;
          border-top: 1px solid #f3f4f6;
        }
        
        .suggestion-label {
          font-size: 12px;
          color: #6b7280;
          font-weight: 600;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .suggestion-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .suggestion-list span {
          padding: 6px 12px;
          background: #f3f4f6;
          border-radius: 20px;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .suggestion-list span:hover {
          background: #e5e7eb;
          color: #111827;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default {
  PrimaryButton,
  SecondaryButton,
  WishlistButton,
  SearchButton
};
