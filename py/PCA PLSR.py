# -*- coding: utf-8 -*-

import numpy as np
import pandas
import os
import matplotlib.pyplot as plt
import data_preprocessing as dp
from sklearn.model_selection  import cross_val_score, cross_val_predict #??
from sklearn.cross_decomposition import PLSRegression
from sklearn.decomposition import PCA
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

item = 'TN'
#status = 'after_process'
status = 'before_process'

#python运行时，当前目录是cmd的当前目录，而不是此py文件所在的目录，所以这里只能手动给其一个相对路径，如果要修改文件夹名，或者移动js文件，注意对应地修改这个path
path="./py/"

def import_dataset(status):
    '''
    ds_name: Name of the dataset 
    Returns:
    wls: Numpy ndarray: List of wavelength
    xdata: Pandas DataFrame: Measurements
    ydata: Pandas Series
    '''
    if status == "before_process":#数据预处理前直接分割
        oct_df = pandas.read_excel(path+"4.3.xlsx")
        #print(oct_df.head())
        xdata = oct_df.iloc[:,3:]
        ydata = oct_df[item]*100  #需要*100是int才能正常使用score
        xdata.index = np.array([ str(i) for i in oct_df.iloc[:,0:1].values])
        ydata.index = xdata.index
        X_train, X_test, y_train, y_test = train_test_split(xdata, ydata,test_size=0.2)
        y_train.to_excel(path+'ytrain.xlsx',encoding='utf-8', index=True, header=True)
        y_test.to_excel(path+'ytest.xlsx',encoding='utf-8', index=True, header=True)
        
    elif status == 'after_process':#数据预处理，只对X_train的部分进行处理，test不变
        oct_df = pandas.read_excel(path+"4.3.xlsx")
        xdata = oct_df.iloc[:,3:]
        ydata = oct_df[item]*100
        wls = np.array([int(float(i)) for i in oct_df.columns.values[3:]])
        xdata.columns = wls
        xdata.index = np.array([ str(i) for i in oct_df.iloc[:,0:1].values])
        ydata.index = xdata.index
        print(xdata,ydata)
        X_train0, X_test0, y_train, y_test = train_test_split(xdata, ydata,test_size=0.2)
        #X_train预处理
        # X_train = dp.plot_D1(wls,X_train0,48)
        X_train.index = X_train0.index
        #X_test预处理
        # X_test = dp.plot_D1(wls,X_test0,12)
        X_test.index = X_test0.index
        X_train = X_train.iloc[:,1:]
        X_test = X_test.iloc[:,1:]
        y_train.to_excel(path+'ytrain.xlsx',encoding='utf-8', index=True, header=True)#得到的结果会*100这个要再处理一下
        y_test.to_excel(path+'ytest.xlsx',encoding='utf-8', index=True, header=True)
    return X_train, X_test, y_train, y_test

def get_score(X_train, X_test, y_train, y_test,nc):
    '''
    input:training and testing dataset
    output:r2 score of 2 methods->pca_score,pls_score
    '''
    #pca方法 
    pca = PCA(n_components=nc)
    X_train_reduced = pca.fit_transform(X_train)
    X_test_reduced = pca.transform(X_test)
    pcr = LinearRegression().fit(X_train_reduced, y_train)
    pca_score = pcr.score(X_test_reduced, y_test)
    predictions = pcr.predict(X_test_reduced)#测试集结果
    predictions1 = pcr.predict(X_train_reduced)#训练集结果
    print(predictions,predictions1)
    plt.title("comparison of PLSR and PCA method(nc={},{})".format(nc,item))
    plt.xlabel("observed")
    plt.ylabel("fitted")
    plt.scatter(y_test/100, predictions/100,label = 'pca')

    #pls方法
    pls = PLSRegression(n_components=nc,).fit(X_train, y_train.astype(int))
    pls_score = pls.score(X_test, y_test)
    yfit = pls.predict(X_test)
    yfit1 = pls.predict(X_train)
    print(yfit,yfit1)
    plt.scatter(y_test/100, yfit/100,label = 'plsr')
    plt.legend()
    # plt.show()
    
    return pca_score,pls_score,predictions/100,predictions1/100,yfit/100,yfit1/100

def plot_r2_score(start,end):
    r2_pca = []
    r2_plsr = []
    components = []
    
    for nc in range(start,end):
        components.append(nc)
        print('--------------------nc = {}------------------------'.format(nc))
        pca_score,pls_score,predictions,predictions1,yfit,yfit1= get_score(X_train, X_test, y_train, y_test,nc)
        print("pca_score,pls_score = {},{}".format(pca_score,pls_score))
        r2_pca.append(pca_score)
        r2_plsr.append(pls_score)
        
    
    # plt.plot(components,r2_plsr,label = "PLSR")
    # plt.plot(components,r2_pca,label = "PCA")
    plt.title("r2 of PLSR and PCA method({},{})".format(item,status))
    plt.xlabel("component")
    plt.ylabel("r2_score")
    plt.legend()
    # plt.show()

if __name__ == "__main__":
    X_train, X_test, y_train, y_test = import_dataset(status)
    start,end = 1,20
    # plot_r2_score(start,end)
    pca_score,pls_score,predictions,predictions1,yfit,yfit1 = get_score(X_train, X_test, y_train, y_test,20)
    predictions = pandas.DataFrame(predictions)
    predictions1 = pandas.DataFrame(predictions1)
    yfit = pandas.DataFrame(yfit)
    yfit1 = pandas.DataFrame(yfit1)
    predictions.to_excel(path+'pca_test.xlsx',encoding='utf-8', index=True, header=True)
    predictions1.to_excel(path+'pca_train.xlsx',encoding='utf-8', index=True, header=True)
    yfit.to_excel(path+'plsr_test.xlsx',encoding='utf-8', index=True, header=True)
    yfit1.to_excel(path+'plsr_train.xlsx',encoding='utf-8', index=True, header=True)
    
