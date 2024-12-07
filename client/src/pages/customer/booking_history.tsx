import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import CustomerSideBar from './sidebar';

const CustomerBookingHistory = () => {
    return (
        <RootLayout>
            <div>
                <CustomerSideBar>
                    {/* Personal Information */}
                    <div className="bg-slate-300 p-8 shadow-lg animate-fadeIn">
                        <div className='overflow-y-scroll grid max-h-96'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Pre-order</th>
                                        <th>Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>2021-09-01</td>
                                        <td>12:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x Beef Steak</li>
                                                <li>1 x Chicken Salad</li>
                                            </ol>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>2021-09-05</td>
                                        <td>18:30</td>
                                        <td>
                                            <ol>
                                                <li>2 x Spaghetti Carbonara</li>
                                                <li>1 x Caesar Salad</li>
                                                <li>2 x Pizza</li>
                                            </ol>
                                        </td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>2021-09-10</td>
                                        <td>20:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x Margherita Pizza</li>
                                                <li>2 x Garlic Bread</li>
                                                <li>1 x Tiramisu</li>
                                            </ol>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>2021-09-15</td>
                                        <td>19:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x Grilled Salmon</li>
                                                <li>1 x Greek Salad</li>
                                            </ol>
                                        </td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>2021-09-20</td>
                                        <td>13:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x BBQ Ribs</li>
                                                <li>1 x Coleslaw</li>
                                            </ol>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>2021-09-25</td>
                                        <td>17:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x Lobster Bisque</li>
                                                <li>1 x House Salad</li>
                                            </ol>
                                        </td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>2021-10-01</td>
                                        <td>14:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x Sushi Platter</li>
                                            </ol>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>2021-10-05</td>
                                        <td>19:30</td>
                                        <td>
                                            <ol>
                                                <li>2 x Pad Thai</li>
                                                <li>1 x Spring Rolls</li>
                                            </ol>
                                        </td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>2021-10-10</td>
                                        <td>12:30</td>
                                        <td>
                                            <ol>
                                                <li>1 x Cheeseburger</li>
                                                <li>1 x Fries</li>
                                                <li>1 x Milkshake</li>
                                            </ol>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>2021-10-15</td>
                                        <td>18:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x Chicken Alfredo</li>
                                                <li>1 x Garlic Bread</li>
                                            </ol>
                                        </td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td>2021-10-20</td>
                                        <td>20:30</td>
                                        <td>
                                            <ol>
                                                <li>1 x Beef Tacos</li>
                                                <li>1 x Nachos</li>
                                                <li>1 x Margarita</li>
                                            </ol>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>2021-10-25</td>
                                        <td>13:30</td>
                                        <td>
                                            <ol>
                                                <li>1 x Fish and Chips</li>
                                            </ol>
                                        </td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>13</td>
                                        <td>2021-11-01</td>
                                        <td>17:30</td>
                                        <td>
                                            <ol>
                                                <li>1 x Veggie Burger</li>
                                                <li>1 x Sweet Potato Fries</li>
                                            </ol>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>14</td>
                                        <td>2021-11-05</td>
                                        <td>19:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x Shrimp Scampi</li>
                                                <li>1 x Caesar Salad</li>
                                            </ol>
                                        </td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>15</td>
                                        <td>2021-11-10</td>
                                        <td>12:00</td>
                                        <td>
                                            <ol>
                                                <li>1 x BLT Sandwich</li>
                                                <li>1 x Chips</li>
                                            </ol>
                                        </td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>16</td>
                                        <td>2021-11-15</td>
                                        <td>18:30</td>
                                        <td>
                                            <ol>
                                                <li>1 x Chicken Curry</li>
                                                <li>1 x Naan Bread</li>
                                                <li>1 x Mango Lassi</li>
                                            </ol>
                                        </td>
                                        <td>Yes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CustomerSideBar>
            </div >
        </RootLayout >
    )
}

export default CustomerBookingHistory;