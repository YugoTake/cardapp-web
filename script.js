document.getElementById('loadQuestion').addEventListener('click', function() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // ヘッダーを除外
            const filteredRows = rows.filter(row => {
                const columns = row.split(',');
                return columns[0] >= start && columns[0] <= end;
            });
            const randomRow = filteredRows[Math.floor(Math.random() * filteredRows.length)];
            const columns = randomRow.split(',');
            document.getElementById('question').textContent = columns[1];
            document.getElementById('answer').textContent = columns[2];
            document.getElementById('showAnswer').style.display = 'inline';
        });
});

document.getElementById('showAnswer').addEventListener('click', function() {
    document.getElementById('answer').style.display = 'block';
});