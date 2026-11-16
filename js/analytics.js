/**
 * MindConsole AI - Mood Analytics Controller (Chart.js Visualization Engine)
 */

class AnalyticsController {
  constructor() {
    this.trendChart = null;
    this.emotionChart = null;
    this.triggerChart = null;
  }

  render() {
    if (!auth.currentUser) return;
    const moods = db.getMoods(auth.currentUser.id);

    this.renderSummaryCards(moods);
    this.renderTrendChart(moods);
    this.renderEmotionChart(moods);
    this.renderTriggerChart(moods);
  }

  renderSummaryCards(moods) {
    const avgElem = document.getElementById('analyticsAvgScore');
    const emotionElem = document.getElementById('analyticsTopEmotion');
    const totalElem = document.getElementById('analyticsTotalLogs');

    if (!moods || moods.length === 0) {
      if (avgElem) avgElem.textContent = 'N/A';
      if (emotionElem) emotionElem.textContent = 'None';
      if (totalElem) totalElem.textContent = '0';
      return;
    }

    const total = moods.length;
    const sum = moods.reduce((acc, m) => acc + (m.score || 3), 0);
    const avg = (sum / total).toFixed(1);

    // Calculate most frequent emotion
    const emotionCounts = {};
    moods.forEach(m => {
      emotionCounts[m.emotion] = (emotionCounts[m.emotion] || 0) + 1;
    });

    let topEmotion = 'Neutral';
    let maxCount = 0;
    Object.keys(emotionCounts).forEach(e => {
      if (emotionCounts[e] > maxCount) {
        maxCount = emotionCounts[e];
        topEmotion = e;
      }
    });

    if (avgElem) avgElem.textContent = `${avg} / 5`;
    if (emotionElem) emotionElem.textContent = topEmotion;
    if (totalElem) totalElem.textContent = total;
  }

  renderTrendChart(moods) {
    const canvas = document.getElementById('moodTrendChart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.trendChart) {
      this.trendChart.destroy();
    }

    const recent = moods.slice(-10);
    const labels = recent.map(m => new Date(m.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
    const dataPoints = recent.map(m => m.score);

    this.trendChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels.length > 0 ? labels : ['No Data'],
        datasets: [{
          label: 'Mood Level (1 to 5)',
          data: dataPoints.length > 0 ? dataPoints : [3],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#14b8a6'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
              callback: (value) => {
                const labels = { 1: '😫 1', 2: '🙁 2', 3: '😐 3', 4: '🙂 4', 5: '😁 5' };
                return labels[value] || value;
              }
            }
          }
        }
      }
    });
  }

  renderEmotionChart(moods) {
    const canvas = document.getElementById('emotionPieChart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.emotionChart) {
      this.emotionChart.destroy();
    }

    const emotionCounts = {
      'Happy': 0,
      'Sadness': 0,
      'Anxiety': 0,
      'Loneliness': 0,
      'Neutral': 0
    };

    moods.forEach(m => {
      const em = m.emotion || 'Neutral';
      if (emotionCounts[em] !== undefined) {
        emotionCounts[em]++;
      } else {
        emotionCounts['Neutral']++;
      }
    });

    this.emotionChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: Object.keys(emotionCounts),
        datasets: [{
          data: Object.values(emotionCounts),
          backgroundColor: [
            '#10b981', // Happy
            '#3b82f6', // Sadness
            '#f59e0b', // Anxiety
            '#8b5cf6', // Loneliness
            '#64748b'  // Neutral
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  renderTriggerChart(moods) {
    const canvas = document.getElementById('triggersBarChart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.triggerChart) {
      this.triggerChart.destroy();
    }

    const triggerCounts = {};
    moods.forEach(m => {
      if (m.triggers && Array.isArray(m.triggers)) {
        m.triggers.forEach(t => {
          triggerCounts[t] = (triggerCounts[t] || 0) + 1;
        });
      }
    });

    const labels = Object.keys(triggerCounts);
    const dataPoints = Object.values(triggerCounts);

    this.triggerChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['None'],
        datasets: [{
          label: 'Frequency',
          data: dataPoints.length > 0 ? dataPoints : [0],
          backgroundColor: 'rgba(20, 184, 166, 0.7)',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });
  }
}

const analyticsController = new AnalyticsController();
