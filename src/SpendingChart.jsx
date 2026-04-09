import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CATEGORY_LABELS } from './constants.js'

const COLORS = ['#ef4422', '#16a34a', '#1d4ed8', '#d97706', '#7c3aed', '#0891b2', '#be185d'];

function SpendingChart({ transactions }) {
  const data = useMemo(() => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name: CATEGORY_LABELS[name] ?? name,
      value,
    }));
  }, [transactions]);

  if (data.length === 0) return null;

  return (
    <div className="chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barCategoryGap="40%">
          <CartesianGrid vertical={false} stroke="#ede7dc" strokeDasharray="0" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#a89888', fontFamily: 'Manrope', fontSize: 12, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#a89888', fontFamily: 'JetBrains Mono', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={52}
          />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Spent']}
            contentStyle={{
              background: '#ffffff',
              border: '1px solid #ede7dc',
              borderRadius: '8px',
              color: '#1a1410',
              fontFamily: 'JetBrains Mono',
              fontSize: '13px',
              boxShadow: '0 4px 16px rgba(26,20,16,0.10)',
              padding: '10px 14px',
            }}
            labelStyle={{ color: '#7a6d60', fontFamily: 'Manrope', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}
            cursor={{ fill: 'rgba(26,20,16,0.04)', radius: 4 }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} fillOpacity={0.9} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
