// js/intro_char_select.js

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Variables ---
    const introSection = document.getElementById('intro-section');
    const storyTextElement = document.getElementById('story-text');
    const nextStoryBtn = document.getElementById('next-story-btn');
    const skipIntroBtn = document.getElementById('skip-intro-btn');
    
    const characterSelectionSection = document.getElementById('character-selection-section');
    const characterCards = document.querySelectorAll('.character-card');
    const confirmCharacterBtn = document.getElementById('confirm-character-btn');
    const resetGameProgressBtn = document.getElementById('reset-game-progress-btn'); // 新增

    // 移除了以下與已刪除的 #selected-character-info 相關的變量
    // const selectedCharacterInfo = document.getElementById('selected-character-info');
    // const charNameDisplay = document.getElementById('char-name-display');
    // const charImgDisplay = document.getElementById('char-img-display');
    // const charAbilityDisplay = document.getElementById('char-ability-display');


    // --- Story Introduction Logic ---
    const storyParts = [
        "有一天，神秘的陰影籠罩了狗子學校...",
        "勇敢的狗狗們決定挺身而出，運用學到的知識，恢復校園的和平！",
        "現在，你需要選擇一位夥伴，與牠一同踏上這段奇妙的奇幻校園旅程。"
    ];
    let currentStoryPart = 0;
    const storyAnimationDuration = 500; 
    let isAnimatingStory = false;      

    function displayCurrentSentence() {
        if (currentStoryPart >= storyParts.length) {
            // 確保故事結束後按鈕狀態正確
            if(nextStoryBtn) nextStoryBtn.style.display = 'none';
            if(skipIntroBtn) {
                skipIntroBtn.textContent = "選擇你的冒險夥伴";
                skipIntroBtn.style.display = 'block';
            }
            return;
        }

        isAnimatingStory = true;
        const p = document.createElement('p');
        p.textContent = storyParts[currentStoryPart];
        if(storyTextElement) storyTextElement.appendChild(p);

        void p.offsetWidth; 

        p.classList.add('active-story-line');
        currentStoryPart++;

        if (currentStoryPart >= storyParts.length) {
            if(nextStoryBtn) nextStoryBtn.style.display = 'none';
            if(skipIntroBtn) {
                skipIntroBtn.textContent = "選擇你的冒險夥伴";
                skipIntroBtn.style.display = 'block';
            }
        } else {
            if(nextStoryBtn) nextStoryBtn.style.display = 'block'; 
            if(skipIntroBtn) {
                skipIntroBtn.style.display = 'inline-block'; 
                skipIntroBtn.textContent = "跳過介紹";
            }
        }
        
        setTimeout(() => {
            isAnimatingStory = false; 
        }, storyAnimationDuration);
    }

    function showNextStoryPart() {
        if (isAnimatingStory) return; 

        const existingSentence = storyTextElement ? storyTextElement.querySelector('p.active-story-line') : null;

        if (existingSentence) {
            isAnimatingStory = true;
            existingSentence.classList.remove('active-story-line');
            existingSentence.classList.add('fading-out');

            setTimeout(() => {
                if (existingSentence.parentNode) { 
                    existingSentence.remove();
                }
                
                if (currentStoryPart < storyParts.length) {
                    displayCurrentSentence();
                } else {
                    isAnimatingStory = false;
                     // 確保故事結束後按鈕狀態正確 (再次檢查，因為可能是從這裡結束)
                    if(nextStoryBtn) nextStoryBtn.style.display = 'none';
                    if(skipIntroBtn) {
                        skipIntroBtn.textContent = "選擇你的冒險夥伴";
                        skipIntroBtn.style.display = 'block';
                    }
                }
            }, 400); 
        } else {
            if (currentStoryPart < storyParts.length) {
                displayCurrentSentence();
            } else {
                if(nextStoryBtn) nextStoryBtn.style.display = 'none';
                if(skipIntroBtn) {
                    skipIntroBtn.textContent = "選擇你的冒險夥伴";
                    skipIntroBtn.style.display = 'block';
                }
            }
        }
    }

    // Initialize Story
    if (storyTextElement) { // 添加判空
        if (storyParts.length > 0) {
            storyTextElement.innerHTML = ''; 
            showNextStoryPart(); 
        } else {
            if(introSection) introSection.classList.remove('active-section');
            if(introSection) introSection.classList.add('hidden-section');
            if(characterSelectionSection) characterSelectionSection.classList.remove('hidden-section');
            if(characterSelectionSection) characterSelectionSection.classList.add('active-section');
            if(nextStoryBtn) nextStoryBtn.style.display = 'none';
            if(skipIntroBtn) skipIntroBtn.style.display = 'none'; 
        }
    }


    // Event Listener for "Next Story" Button
    if (nextStoryBtn) {
        nextStoryBtn.addEventListener('click', showNextStoryPart);
    }

    // Event Listener for "Skip Intro / Go to Character Select" Button
    if (skipIntroBtn) {
        skipIntroBtn.addEventListener('click', () => {
            isAnimatingStory = false; 
            
            if(introSection) introSection.classList.remove('active-section');
            if(introSection) introSection.classList.add('hidden-section');
            if(characterSelectionSection) characterSelectionSection.classList.remove('hidden-section');
            if(characterSelectionSection) characterSelectionSection.classList.add('active-section');
            
            if(storyTextElement) storyTextElement.innerHTML = '';
            currentStoryPart = storyParts.length; 

            // 更新跳過按鈕的文本
            skipIntroBtn.textContent = "選擇你的冒險夥伴"; 
        });
    }


    // --- Character Selection Logic ---
    let selectedCharacterData = null;

    if (characterCards && characterCards.length > 0) {
        characterCards.forEach(card => {
            card.addEventListener('click', () => {
                characterCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                const charName = card.querySelector('h3').textContent;
                const charImgSrc = card.querySelector('.character-image-full').src; 
                const charAbility = card.querySelector('.ability').textContent;
                const charDataName = card.dataset.char;

                selectedCharacterData = {
                    id: charDataName,
                    name: charName,
                    img: charImgSrc, 
                    ability: charAbility 
                };

                // 移除了更新已刪除的 #selected-character-info 相關元素的代碼
                // charNameDisplay.textContent = charName;
                // charImgDisplay.src = charImgSrc; 
                // charAbilityDisplay.textContent = charAbility;
                // selectedCharacterInfo.style.display = 'block';
            });

            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault(); 
                    card.click(); 
                }
            });
        });
    }


    // Event Listener for "Confirm Character" Button
    if (confirmCharacterBtn) {
        confirmCharacterBtn.addEventListener('click', () => {
            if (selectedCharacterData) {
                localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacterData));
                window.location.href = 'map_selection.html';
            } else {
                alert('請先選擇一個冒險夥伴！');
            }
        });
    }

    // --- Reset Game Progress Logic ---
    if (resetGameProgressBtn) {
        resetGameProgressBtn.addEventListener('click', function() {
            const isConfirmed = confirm("確定要重置所有遊戲進度嗎？\n所有肉乾、地下室解鎖狀態以及已選擇的角色都將被清除。");

            if (isConfirmed) {
                localStorage.removeItem('meatJerkyCount');
                localStorage.removeItem('basementUnlocked');
                localStorage.removeItem('selectedCharacter'); 
                // localStorage.removeItem('someOtherProgress'); // 如果有其他

                alert("遊戲進度已重置！");

                // 清除UI上的選擇狀態
                selectedCharacterData = null; 
                if (characterCards) {
                    characterCards.forEach(c => c.classList.remove('selected'));
                }
                
                // 刷新頁面以應用重置
                window.location.reload(); 
            }
        });
    }
});