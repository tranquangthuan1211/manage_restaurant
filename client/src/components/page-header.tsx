import React from 'react';
const PageHeader: React.FC<{ title: string, subtitle: string, alignment?: string }> = ({ title, subtitle, alignment = 'center' }) => (
  <div>
    <div className="flex items-center w-full col-span-full my-4">
      {alignment != 'start' && (
        <div className="flex-grow border-t border-slate-400"></div>
      )}
      <h2 className="flex-shrink mx-2 text-slate-400 text-center italic">{title}</h2>
      {alignment != 'end' && (
        <div className="flex-grow border-t border-slate-400"></div>
      )}
    </div>
    <div className={`col-span-full flex justify-${alignment} text-primary mb-4`}>{subtitle}</div>
  </div>
);

export default PageHeader;