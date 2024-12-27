import dynamic from 'next/dynamic';
import { Page as PageType } from 'src/types/page';
import { Layout } from "src/layouts/index";
import { Box, Stack, Typography } from '@mui/material';
import ContentHeader from 'src/sections/dashboard/content-header';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventNoteIcon from '@mui/icons-material/EventNote';
import {NewCustomerTable} from 'src/sections/statistical/new-customer-table';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const tabs = [
    { name: "doanh thu", quantity: "100", icon: <ShoppingCartCheckoutIcon sx={{ color: "white" }} />, color: "blue" },
    { name: "sản phẩm được yêu thích", quantity: "100", icon: <FastfoodIcon sx={{ color: "white" }} />, color: "green" },
    { name: "đánh giá", quantity: "100", icon: <EventNoteIcon sx={{ color: "white" }} />, color: "red" },
];

const Page: PageType = () => {
    const options: ApexCharts.ApexOptions = {
        series: [{
            name: 'Sales',
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
        }],
        chart: {
            height: 350,
            type: 'line',
        },
        forecastDataPoints: {
            count: 7,
        },
        stroke: {
            width: 5,
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000',
                '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000',
                '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001',
                '4/11/2001', '5/11/2001', '6/11/2001'
            ],
            tickAmount: 10,
            labels: {
                formatter: (value, timestamp, opts) => {
                    if (timestamp) {
                        return opts.dateFormatter(new Date(timestamp), 'dd MMM');
                    }
                    return '';
                }
            }
        },
        title: {
            text: 'Forecast',
            align: 'left',
            style: {
                fontSize: "16px",
                color: '#666',
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100],
            },
        },
    };
    const optionsPie: ApexCharts.ApexOptions= {
        series: [44, 55, 13, 43, 22],
        chart: {
          width: 400,
          type: 'pie',
        },
        labels: ['Bánh táo', 'Gỏi trộn', 'Rượu vang', 'Vịt hầm', 'Lẩu'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      };
    return (
        <Stack spacing={3} sx={{ padding: "16px", }}>
            <ContentHeader
                title="Thống kê"
                rightSection={
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        height: "40px",
                        padding: "0 16px",
                    }} />
                }
            />
            <Stack
                sx = {{
                    backgroundColor:"#ccc",
                    padding:"10px"
                }}
            >
                <Stack direction={"row"} spacing={3}>
                    {tabs.map((tab, index) => (
                        <Stack
                            key={index}
                            flexDirection={"row"}
                            sx={{
                                display: "flex",
                                width: "100%",
                                height: "50px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                paddingRight: "16px",
                                backgroundColor: "white",
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    width: "50px",
                                    backgroundColor: tab.color,
                                    borderTopLeftRadius: "8px",
                                    borderBottomLeftRadius: "8px",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginRight: "8px",
                                }}
                            >
                                {tab.icon}
                            </Box>
                            <Box>
                                <Typography variant="body2">{tab.name}</Typography>
                                <Typography variant="h6">{tab.quantity}</Typography>
                            </Box>
                        </Stack>
                    ))}
                </Stack>
                <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    sx = {{
                        width: "100%",
                        backgroundColor: "#ccc",
                        padding: "16px 0",
                        overflow: "hidden",

                    }}
                >
                    <Stack
                        sx = {{
                            backgroundColor: "white",
                        }}
                    >
                        <Chart
                            height={240}
                            width={"600px"}
                            options={options}
                            series={options.series}
                            type="line"
                        />
                    </Stack>
                    <Stack
                        sx = {{
                            backgroundColor: "white",
                        }}
                    >
                        <Chart
                            height={240}
                            width={"500px"}
                            options={optionsPie}
                            series={optionsPie.series}
                            type="pie"
                        />
                    </Stack>
                </Stack>
                {/* table */}
                <Stack> 
                    <NewCustomerTable
                        newCustomers={[]}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}

Page.getLayout = (page) => <Layout>{page}</Layout>;
export default Page;
