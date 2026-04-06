import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';


const COLORS = ['red', 'yellow', '#82ca9d', '#a4de6c', '#ffc658', '#ff8042'];

const CATEGORY_LABELS = {
  food: 'Food',
  housing: 'Housing',
  utilities: 'Utilities',
  transport: 'Transport',
  entertainment: 'Entertainment',
  salary: 'Salary',
  other: 'Other',
};

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({
    name: CATEGORY_LABELS[name] ?? name,
    value,
  }));

  if (data.length === 0) return null;

  return (
    <div className="chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="value">
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
