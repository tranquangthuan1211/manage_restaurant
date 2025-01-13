import React, { useState, useMemo, use, useEffect } from "react"
import {Page as PageType} from "src/types/page"
import { Layout } from "src/layouts/index"
import ContentHeader from 'src/sections/dashboard/content-header';
import { Stack, Box, Button, Tabs, Tab, useMediaQuery, Theme } from '@mui/material';
import ProductPage from 'src/sections/staff-menu';
import Menu, {MenuItemProps} from "src/components/menu";

const DefaultMenuItem: React.FC<MenuItemProps> = ({item, additionalParams}) => {
    const maxDescriptionLength = 50;
    const showAddToCart = false;
    return (
      <div className="col-span-1 grid grid-cols-12 auto-rows-max border-solid border-r-2 border-slate-100 py-4 px-2">
        {/* Image */}
        <div className="col-span-3 flex justify-center items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover object-center rounded-full"
          />
        </div>
        {/* Details */}
        <div className="col-span-8 grid grid-cols-8">
          {/* Name */}
          <h4 className="col-span-6 text-lg font-semibold">{item.name}</h4>
          {/* Price */}
          <span className="col-span-2 text-lg font-bold text-green-600 text-end">${item.price}</span>
          {/* Description */}
          <p className={`text-slate-500 text-sm ${showAddToCart ? "col-span-6" : "col-span-full"} h-12 overflow-hidden`}>{
            item.description.length > maxDescriptionLength ? item.description.substring(0, maxDescriptionLength) + '...' : item.description
          }</p>
          {/* Add to Cart */}
          {showAddToCart && (
            <div className="col-span-2 flex justify-end items-start">
              <button className="button-outline-primary text-xs">
                Preorder
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

const Page:PageType = () => {
    return (
        <Stack spacing={2}>
            <ContentHeader 
                title="Restaurant Menu" 
                rightSection={
                    <Box
                        sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        height: "40px",
                        padding: "0 16px",
                        }}
                    >

                    </Box>
                  }
            />
            <Menu itemComponent={DefaultMenuItem} title="Menu" subtitle="Restaurant Complete Menu"/>
        </Stack>
    )
}

Page.getLayout = (page) => 
<Layout>
    {page}
</Layout>

export default Page;