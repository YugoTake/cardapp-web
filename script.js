// 音声読み上げ機能
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // 日本語に設定
    speechSynthesis.speak(utterance);
}

document.getElementById('loadQuestion').addEventListener('click', function() {
    // 以前のコードをここに含む
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
            
            // 問題を読み上げる
            speak(columns[1]);
        });
});

document.getElementById('showAnswer').addEventListener('click', function() {
    // 答えを表示し、読み上げる
    document.getElementById('answer').style.display = 'block';
    speak(document.getElementById('answer').textContent);
});
