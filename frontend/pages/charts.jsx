import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';


function groupDataByCategory(data) {
    const grouped = {};
    data.forEach(item => {
        const cat = item.cat.trim();
        const amt = Number(item.amt); 
        if (grouped[cat]) {
            grouped[cat] += amt;
        } else {
            grouped[cat] = amt;
        }
    });
    return Object.entries(grouped).map(([cat, amt]) => ({ cat, amt, name: cat }));
}

function groupDataByMembers(data) {
    const grouped = {};
    data.forEach(item => {
        const mem = item.mem.trim(); 
        const pay = Number(item.pay); 
        if (grouped[mem]) {
            grouped[mem] +=pay;
        } else {
            grouped[mem] = pay;
        }
    });
    return Object.entries(grouped).map(([mem, pay]) => ({ mem, pay, name: mem }));
}

const Charts = () => {

    const rawData1 = JSON.parse(localStorage.getItem("dataforchart1") || "[]");
    const rawData2 = JSON.parse(localStorage.getItem("dataforchart2") || "[]");
    const data1 = groupDataByCategory(rawData1);
    const data2 = groupDataByMembers(rawData2);
    return (
        <div style={{ width: '100%', height: 400 }}>
            <h1 style={{color:"rgb(70, 4, 70,0.8)",fontSize:"1.5em", borderRadius:"10px", textAlign:"center"  }}>Category wise spending</h1>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="amt"
                        data={data1}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label={({ cat }) => cat}
                    />
                    <Tooltip />
                    
                </PieChart>
            </ResponsiveContainer>
            <h1 style={{color:"rgb(70, 4, 70,0.8)",fontSize:"1.5em", borderRadius:"10px", textAlign:"center"  }}>Contribution by members</h1>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="pay"
                        data={data2}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label={({ mem }) => mem}
                    />
                    <Tooltip />
                    
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;
