import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell, Sector } from 'recharts';

// EventGenresChart component to display a pie chart of event genres
const EventGenresChart = ({ events }) => {
    // State to hold the data for the pie chart
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    // Array of genres to be displayed in the pie chart
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    // Function to get the data for the pie chart
    const getData = () => {
        // Map over the genres array to create data for the pie chart
        const data = genres.map(genre => {
            // Filter events that include the current genre in their summary (case-insensitive)
            const filteredEvents = events.filter(event => 
                event.summary.toLowerCase().includes(genre.toLowerCase())
            );
            // Return an object with the genre name and the count of events for that genre
            return {
                name: genre,
                value: filteredEvents.length
            };
        });
        // Only show genres with events
        return data.filter(item => item.value > 0);
    };

    // useEffect to update the data state when the events prop changes
    useEffect(() => {
        setData(getData());
    }, [events]);

    // Function to render customized labels for the pie chart
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`${value} Events (${(percent * 100).toFixed(0)}%)`}
                </text>
            </g>
        );
    };

    // Array of colors for the pie slices
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

    // Function to handle mouse enter event on pie chart
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <div>
            <h2>Event Types Distribution</h2>
            <ResponsiveContainer width="99%" height={400}>
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data} // Data for the pie chart
                        dataKey="value" // Key to determine the value of each slice
                        nameKey="name" // Key to determine the name of each slice
                        cx="50%" // Center x-coordinate of the pie chart
                        cy="50%" // Center y-coordinate of the pie chart
                        innerRadius={60} // Inner radius of the pie chart
                        outerRadius={80} // Outer radius of the pie chart
                        onMouseEnter={onPieEnter} // Function to handle mouse enter event
                    >
                        {/* Map over the data to create a Cell for each slice with a different color */}
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip /> {/* Tooltip to show data on hover */}
                    <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry) => `${value} (${entry.payload.value} events)`}
                    /> {/* Legend to show the genres */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventGenresChart;
