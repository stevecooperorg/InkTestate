# Stage 1: Base with Python and Node.js
FROM python:3.7 AS base
RUN apt-get update && apt-get install -y nodejs npm git
WORKDIR /app

# Clone specific commit of ink-proof
ARG COMMIT_HASH=d6b68e3026b4f97ea0e8ae92b6da561441b131ae
RUN git clone https://github.com/chromy/ink-proof.git . \
    && git checkout ${COMMIT_HASH}

# Stage 2: Build
FROM base AS builder
# Install Python dependencies
# If there's a requirements.txt, uncomment the next line
# RUN pip install -r requirements.txt
RUN python3 install_deps.py
# Install Node.js dependencies
# If there are Node.js dependencies, uncomment the next line
# RUN npm install

# Add any additional build steps here if necessary

# Stage 3: Final image
FROM python:3.7-slim
WORKDIR /app
COPY --from=builder /app .

# Expose port if your application uses one
# EXPOSE your_port

CMD ["python", "proof.py", "inkjs_v2.2.1", "inkjs_v2.2.1_runtime"]