# zeller-backend-ts-coding-challenge

## Overview
Zeller is starting a computer store. The task is to build the checkout system.

## Problem Statement
[PROBLEM_STATEMENT](./PROBLEM_STATEMENT.md)


## Development Guide

### Technologies Used

1. NodeJS
2. Jest Test Framework


### Design Goals

1. Code should follow SOLID design principle to make the code more maintainable, extensible in the future, enahancing readability.
2. Pricing Rules can be added/deleted in future and same rule could be applicable on multiple products.
3. Business logic should not change in case of modification to the storage media (e.g., database)
4.  Code follows immutable design patterns such as there are only getter methods in the class no setter methods, but specific method which allow modification to specific property of the class based on predefined behaviour, making properties readonly etc.

### Build the application
```
npm run build
```

### Run the application
```
npm run app
```
![image](https://github.com/SuchismitaGoswami/zeller-backend-ts-coding-challenge/assets/20485477/08fc5186-4f55-4f7a-89b9-6f4701dbf1fd)


### Format the application
```
npm run format
```

### Run the unit test
```
npm run test:unit
```

