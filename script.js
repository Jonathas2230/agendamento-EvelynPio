// Show/hide equipment details based on radio selection
        document.querySelectorAll('input[name="equipment"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const equipmentDetails = document.getElementById('equipmentDetails');
                if (this.value === 'Sim') {
                    equipmentDetails.classList.remove('hidden');
                    document.getElementById('equipmentDescription').removeAttribute('disabled');
                } else {
                    equipmentDetails.classList.add('hidden');
                    document.getElementById('equipmentDescription').setAttribute('disabled', 'disabled');
                }
            });
        });

        // Toggle between single day and multi-day fields
        document.getElementById('singleDayRadio').addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('singleDayFields').classList.remove('hidden-fields');
                document.getElementById('singleDayFields').classList.add('visible-fields');
                document.getElementById('multiDayFields').classList.remove('visible-fields');
                document.getElementById('multiDayFields').classList.add('hidden-fields');
                
                // Clear multi-day fields when switching
                document.getElementById('startDate').value = '';
                document.getElementById('endDate').value = '';
            }
        });

        document.getElementById('multiDayRadio').addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('multiDayFields').classList.remove('hidden-fields');
                document.getElementById('multiDayFields').classList.add('visible-fields');
                document.getElementById('singleDayFields').classList.remove('visible-fields');
                document.getElementById('singleDayFields').classList.add('hidden-fields');
                
                // Clear single day fields when switching
                document.getElementById('singleDate').value = '';
                document.getElementById('startTime').value = '';
                document.getElementById('endTime').value = '';
            }
        });

        // Form submission to WhatsApp
        // Show/hide other event type field
        document.getElementById('eventType').addEventListener('change', function() {
            const otherContainer = document.getElementById('otherEventTypeContainer');
            if (this.value === 'Outro') {
                otherContainer.classList.remove('hidden');
                document.getElementById('otherEventType').setAttribute('required', 'required');
            } else {
                otherContainer.classList.add('hidden');
                document.getElementById('otherEventType').removeAttribute('required');
                document.getElementById('otherEventType').value = '';
            }
        });

        document.getElementById('eventForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const role = document.getElementById('role').value;
            const phone = document.getElementById('phone').value;
            let eventType = document.getElementById('eventType').value;
            if (eventType === 'Outro') {
                eventType = document.getElementById('otherEventType').value;
            }
            
            // Get event dates based on selection
            let eventDates = '';
            if (document.getElementById('singleDayRadio').checked) {
                const singleDate = document.getElementById('singleDate').value;
                const startTime = document.getElementById('startTime').value;
                const endTime = document.getElementById('endTime').value;
                const dateObj = new Date(singleDate);
                const formattedDate = dateObj.toLocaleDateString('pt-BR');
                eventDates = `${formattedDate}, das ${startTime} às ${endTime}`;
            } else {
                const startDate = document.getElementById('startDate').value;
                const endDate = document.getElementById('endDate').value;
                const startDateObj = new Date(startDate);
                const endDateObj = new Date(endDate);
                const startTimeMulti = document.getElementById('startTimeMulti').value;
                const endTimeMulti = document.getElementById('endTimeMulti').value;
                const formattedStart = startDateObj.toLocaleDateString('pt-BR');
                const formattedEnd = endDateObj.toLocaleDateString('pt-BR');
                eventDates = `De ${formattedStart} ${startTimeMulti} a ${formattedEnd} ${endTimeMulti}`;
            }
            
            const venueName = document.getElementById('venueName').value;
            const street = document.getElementById('street').value;
            const number = document.getElementById('number').value;
            const neighborhood = document.getElementById('neighborhood').value;
            const city = document.getElementById('city').value;
            const state = document.getElementById('state').value;
            
            const fullAddress = `${street}, ${number} - ${neighborhood}, ${city}/${state}`;
            
            const equipment = document.querySelector('input[name="equipment"]:checked').value;
            let equipmentDetails = '';
            if (equipment === 'Sim') {
                equipmentDetails = document.getElementById('equipmentDescription').value;
            }
            
            const socialMedia = document.getElementById('socialMedia').value;
            const additionalInfo = document.getElementById('additionalInfo').value;
            
            // Construct WhatsApp message
            let message = `*FORMULARIO DE AGENDAMENTO - EVELYN PIO*`;
            message += `*Solicitante:* ${name}%0A`;
            message += `*Cargo/Representação:* ${role}%0A`;
            message += `*Telefone:* ${phone}%0A%0A`;
            message += `*Tipo de Evento:* ${eventType}%0A`;
            message += `*Data(s) do Evento:* ${eventDates}%0A%0A`;
            message += `*Local do Evento:*%0A`;
            message += `${venueName}%0A`;
            message += `${fullAddress}%0A%0A`;
            message += `*Equipamentos disponíveis:* ${equipment}`;
            if (equipmentDetails) {
                message += ` (${equipmentDetails})`;
            }
            message += `%0A%0A`;
            
            if (socialMedia) {
                message += `*Redes Sociais:* ${socialMedia}%0A%0A`;
            }
            if (additionalInfo) {
                message += `*Informações Adicionais:* ${additionalInfo}%0A`;
            }
            
            // Open WhatsApp with the message
            const phoneNumber = '5581989550769';
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });