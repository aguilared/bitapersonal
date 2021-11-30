import React from 'react';

export type BitacoraProps = {
  id: number;
  bitacoraDate: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Bitacora: React.FC<{ bitacora: BitacoraProps }> = ({ bitacora }) => {
  const authorName = bitacora.author.name
    ? bitacora.author.name
    : 'Unknown author';
  return (
    <li>
      <Link href="/bitacora/[id]" as={`/bitacora/${bitacora.id}`}>
        <a>
          {bitacora.id}
          {}
          {bitacora.bitacoraDate}
          {}
          {authorName}
        </a>
      </Link>
    </li>
  );
};

export default Bitacora;
