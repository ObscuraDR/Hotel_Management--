import { useState } from 'react';
import { Card, Button, Badge, Tooltip, Avatar } from 'antd';
import { 
  HeartOutlined, 
  HeartFilled, 
  EyeOutlined, 
  ShareAltOutlined, 
  CheckCircleOutlined,
  WifiOutlined,
  CarOutlined,
  CoffeeOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const amenityIcons = {
  'Free WiFi': <WifiOutlined />,
  'Airport Transfer': <CarOutlined />,
  'Coffee/Tea Maker': <CoffeeOutlined />,
  'Mini Bar': <CoffeeOutlined />,
  'Work Desk': <TeamOutlined />
};

function availabilityFromRoomId(roomId) {
  let h = 0;
  const s = String(roomId ?? "");
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  const u = (Math.abs(h) % 1000) / 1000;
  if (u > 0.8) return { status: "limited", color: "orange", text: "Only 2 left!" };
  if (u > 0.3) return { status: "available", color: "green", text: "Available" };
  return { status: "few", color: "yellow", text: "Few rooms left" };
}

export default function InteractiveRoomCard({ room, onCompare, onWishlist, isComparing = false, isInWishlist = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [show360View, setShow360View] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const availability = availabilityFromRoomId(room.id);

  return (
    <Card
      className={`interactive-room-card transition-all duration-300 ${
        isHovered ? 'shadow-2xl transform -translate-y-2' : 'shadow-lg'
      } ${isComparing ? 'ring-2 ring-indigo-500' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cover={
        <div className="relative">
          {/* Room Images */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            />
            
            {/* Overlay on Hover */}
            {isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setShow360View(true)}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  <EyeOutlined /> 360° View
                </Button>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {room.tag && (
                <Badge
                  count={room.tag}
                  style={{
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              )}
              <Badge
                count={availability.text}
                style={{
                  backgroundColor: availability.color === 'green' ? '#10b981' : 
                                   availability.color === 'orange' ? '#f59e0b' : '#eab308',
                  color: 'white'
                }}
              />
            </div>

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Tooltip title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}>
                <Button
                  shape="circle"
                  icon={isInWishlist ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                  onClick={() => onWishlist(room)}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100"
                />
              </Tooltip>
              <Tooltip title="Share room">
                <Button
                  shape="circle"
                  icon={<ShareAltOutlined />}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100"
                />
              </Tooltip>
            </div>
          </div>

          {/* Room Type Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full">
              <span className="text-sm font-semibold" style={{ color: room.color }}>
                {room.type}
              </span>
            </div>
          </div>
        </div>
      }
      actions={[
        <Button
          key="compare"
          type={isComparing ? 'primary' : 'default'}
          icon={<CheckCircleOutlined />}
          onClick={() => onCompare(room)}
          className="w-full"
        >
          {isComparing ? 'Comparing' : 'Compare'}
        </Button>,
        <Link key="view" to={`/guest/rooms/${room.id}`}>
          <Button type="primary" className="w-full">
            View Details
          </Button>
        </Link>
      ]}
    >
      {/* Room Content */}
      <div className="p-4">
        {/* Room Name and Rating */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{room.name}</h3>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {'★'.repeat(5)}
              </div>
              <span className="text-sm text-gray-600">(4.9)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">
              {formatPrice(room.price)}
            </div>
            <div className="text-xs text-gray-500">per night</div>
          </div>
        </div>

        {/* Room Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.desc}
        </p>

        {/* Room Features */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TeamOutlined />
            <span>Max {room.maxGuests || 2} guests</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center text-xs">
              {room.bedType === 'King Bed' ? 'K' : room.bedType === 'Queen Bed' ? 'Q' : 'T'}
            </div>
            <span>{room.bedType || 'Queen Bed'}</span>
          </div>
          {room.size && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span>{room.size}</span>
            </div>
          )}
        </div>

        {/* Amenities Preview */}
        {room.amenities && room.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {room.amenities.slice(0, 3).map((amenity, index) => (
                <Tooltip key={index} title={amenity}>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                    {amenityIcons[amenity] || <CheckCircleOutlined />}
                  </div>
                </Tooltip>
              ))}
              {room.amenities.length > 3 && (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  +{room.amenities.length - 3}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Special Offers */}
        {room.specialOffer && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-red-600">
                  {room.specialOffer.discount}
                </div>
                <div className="text-xs text-gray-600">
                  {room.specialOffer.desc}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Valid: {room.specialOffer.validUntil}
              </div>
            </div>
          </div>
        )}

        {/* Quick Info */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Free cancellation</span>
          <span>Book now, pay later</span>
        </div>
      </div>

      {/* 360 View Modal (placeholder) */}
      {show360View && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">360° Room View</h3>
              <Button onClick={() => setShow360View(false)}>Close</Button>
            </div>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <EyeOutlined className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-600">360° view coming soon</p>
                <p className="text-sm text-gray-500">Experience the room in virtual reality</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
