import { ImageResponse } from 'next/og';
import { FaDollarSign } from 'react-icons/fa6';

// Image metadata
export const size = {
  width: 50,
  height: 50,
};

export default function Logo() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'teal',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        <FaDollarSign />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  );
}
