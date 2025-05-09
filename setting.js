// 页面加载时读取保存的 API 密钥
window.onload = () => {
    const savedApiKey = localStorage.getItem('apiKey');
    const savedmodelName = localStorage.getItem('modelName');
    const selectedURL = localStorage.getItem('selectedURL');
    if (savedApiKey) {
      document.getElementById('apiKeyInput').value = savedApiKey;
      document.getElementById('modelNameInput').value = savedmodelName;
      document.getElementById('URLSelect').value = selectedURL;
    }
  };

// 监听保存设置表单的提交事件
document.getElementById('apiKeyForm').addEventListener('submit', function(event) {
    event.preventDefault();  // 防止表单默认提交
  
    // 获取输入的 API 密钥和模型名称
    const apiKey = document.getElementById('apiKeyInput').value;
    const modelName = document.getElementById('modelNameInput').value;
    const selectedURL = document.getElementById('URLSelect').value;
    let URL="";
    switch (selectedURL) {
      case "aliyun":
        URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
         break;
      case "glm":
        URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
         break;
      default:
        URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
    } 
  
    // 保存到 localStorage
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('modelName', modelName);
    localStorage.setItem('selectedURL', selectedURL);
    localStorage.setItem('URL', URL);
    console.log(URL)
  
    // 提示用户保存成功
    alert("设置已保存！");
  });

// 加载并应用主题和选项
document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 获取已保存的主题
    const savedTheme = localStorage.getItem('theme') || 'emerald';  // 默认主题是 emerald
    document.body.setAttribute('data-theme', savedTheme);
    document.getElementById('themeSelect').value = savedTheme;

    // 获取复选框元素
    const sentenceToggle = document.getElementById('sentenceToggle');

    // 假设 sentenceToggleState 是你从 localStorage 中读取的布尔值
    let sentenceToggleState = localStorage.getItem('sentenceToggle') === 'true';

    // 根据读取的状态设置复选框的选中状态
    sentenceToggle.checked = sentenceToggleState;
});
  
// 保存主题设置
document.getElementById('themeForm').addEventListener('submit', function(event) {
  event.preventDefault();  // 防止表单默认提交

  // 获取选择的主题
  const selectedTheme = document.getElementById('themeSelect').value;

  // 保存到 localStorage
  localStorage.setItem('theme', selectedTheme);

  // 应用新的主题
  document.body.setAttribute('data-theme', selectedTheme);

  // 提示用户保存成功
  alert("主题已保存！");
});

  // 按回车键时触发搜索
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const searchWord = searchInput.value.trim();
      if (searchWord) {
        // 查找单词并展示详细信息
        searchAndDisplayWord(searchWord);
      }
    }
  });

  function searchAndDisplayWord(word) {
    // 如果当前不在 index.html，跳转并传递单词作为 URL 参数
    if (!window.location.pathname.endsWith("index.html") && !window.location.pathname.endsWith("/")) {
      window.location.href = `index.html?search=${encodeURIComponent(word)}`;
      return;
    }
  }

// 从浏览器本地存储加载熟记和收藏数据
let memorizedWords = JSON.parse(localStorage.getItem('memorizedWords')) || [];
let favoriteWords = JSON.parse(localStorage.getItem('favoriteWords')) || [];

// 导出数据
document.getElementById("exportBtn").addEventListener("click", () => {
  const data = {
    memorizedWords: memorizedWords,
    favoriteWords: favoriteWords
  };
  
  // 转换数据为 JSON 格式
  const dataStr = JSON.stringify(data);

  // 创建一个 Blob 对象并生成下载链接
  const blob = new Blob([dataStr], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'wordData.json';
  
  // 触发下载
  link.click();
});

// 导入数据
document.getElementById("importBtn").addEventListener("click", () => {
  // 创建一个文件选择器来选择 JSON 文件
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.addEventListener('change', event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        try {
          // 读取文件内容并解析 JSON 数据
          const importedData = JSON.parse(e.target.result);
          
          // 更新 localStorage 中的内容
          memorizedWords = importedData.memorizedWords || [];
          favoriteWords = importedData.favoriteWords || [];
          localStorage.setItem('memorizedWords', JSON.stringify(memorizedWords));
          localStorage.setItem('favoriteWords', JSON.stringify(favoriteWords));

          // 更新页面中的单词卡片列表
          displayWordList();
        } catch (error) {
          alert("上传出现错误！"+error);
        }
      };

      // 读取选中的文件
      reader.readAsText(file);
    }
  });

  // 触发文件选择框
  input.click();
});


const sentenceToggle = document.getElementById('sentenceToggle');
// 监听开关状态变化，保存到localStorage
sentenceToggle.addEventListener('change', () => {
  localStorage.setItem('sentenceToggle', sentenceToggle.checked);
});